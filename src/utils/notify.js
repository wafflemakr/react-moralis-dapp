import { createStandaloneToast } from "@chakra-ui/react";
const toast = createStandaloneToast();
// const customToast = createStandaloneToast({ theme: yourCustomTheme })

// TYPE "info" | "warning" | "success" | "error"

export default function notify(status, title, description, duration = 3000) {
  return toast({
    title,
    description,
    status,
    duration,
    isClosable: true,
    position: "top-right",
  });
}
