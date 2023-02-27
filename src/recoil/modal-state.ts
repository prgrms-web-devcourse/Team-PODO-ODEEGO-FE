import { ReactNode } from "react";
import { atom } from "recoil";

export interface ModalProps {
  children: ReactNode;
  btnText?: {
    confirm?: string;
    close?: string;
  };
  handleClose?: (...arg: unknown[]) => unknown;
  handleConfirm?: (...arg: unknown[]) => unknown;
}

export const modalState = atom<ModalProps | null>({
  key: "modalState",
  default: null,
});
