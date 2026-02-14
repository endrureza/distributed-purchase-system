"use client";

import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";

type UserIdInputProps = {
  userId: string;
  setUserId: (id: string) => void;
};

const UserIdInput = ({ userId, setUserId }: UserIdInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Input
      ref={inputRef}
      value={userId}
      onChange={(e) => setUserId(e.target.value)}
      placeholder="Type your user ID..."
    />
  );
};

export default UserIdInput;
