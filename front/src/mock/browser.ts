import { setupWorker } from "msw/browser";
import { getGohanSchemaMock } from "../api";

export const worker = setupWorker(...getGohanSchemaMock());
