import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { StoreProvider } from "./data/store";
import { Toaster } from "sonner";

export default function App() {
  return (
    <StoreProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </StoreProvider>
  );
}
