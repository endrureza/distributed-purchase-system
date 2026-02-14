import { SaleService } from '../sale/sale.service';

describe('SaleController', () => {
  let service: SaleService;

  const redisMock = {
    attemptPurchase: jest.fn(),
    hasPurchased: jest.fn(),
  };

  const queueMock = {
    enqueuePurchase: jest.fn(),
  };

  beforeEach(() => {
    service = new SaleService(redisMock as any, queueMock as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns UPCOMING when sale has not started', async () => {
    jest.spyOn(service, 'getStatus').mockReturnValue('UPCOMING');

    const result = await service.buy('user1');

    expect(result).toEqual('UPCOMING');
  });

  it('returns SOLD_OUT when redis return -1', async () => {
    jest.spyOn(service, 'getStatus').mockReturnValue('ACTIVE');
    redisMock.attemptPurchase.mockResolvedValue(-1);

    const result = await service.buy('user1');

    expect(result).toEqual({ status: 'SOLD_OUT' });
    expect(queueMock.enqueuePurchase).not.toHaveBeenCalled();
  });

  it('returns PURCHASED when redis returns -2', async () => {
    jest.spyOn(service, 'getStatus').mockReturnValue('ACTIVE');
    redisMock.attemptPurchase.mockResolvedValue(-2);

    const result = await service.buy('user1');

    expect(result).toEqual({ status: 'PURCHASED' });
    expect(queueMock.enqueuePurchase).not.toHaveBeenCalled();
  });

  it('enqueues purchase when successful', async () => {
    jest.spyOn(service, 'getStatus').mockReturnValue('ACTIVE');
    redisMock.attemptPurchase.mockResolvedValue(1);

    const result = await service.buy('user1');

    expect(result).toEqual({ status: 'SUCCESS' });
    expect(queueMock.enqueuePurchase).toHaveBeenCalledWith('user1');
  });

  it('returns true if user has purchased', async () => {
    redisMock.hasPurchased.mockResolvedValue(1);

    const result = await service.getUserPurchaseStatus('user1');

    expect(result).toBe(true);
  });
});
