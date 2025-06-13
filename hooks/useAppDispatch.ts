"use client";

import { useDispatch } from "react-redux";
import type { AppDispatch } from "../_core/store/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
