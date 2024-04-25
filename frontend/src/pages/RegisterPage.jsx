import { FormRegister } from "@/components/FormRegister";
import { useEffect } from "react";

export const RegisterPage = () => {
    useEffect(() => {
        document.title = "Register"
    });
    return (
        <div className="h-screen w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="hidden bg-muted lg:block">
          <img
            alt="Image"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            height="1080"
            src="https://lh5.googleusercontent.com/-xrIHCfttwRY/Tyiucc-LEQI/AAAAAAAAJoQ/ax_rAFKuaCQ/s980/IPB1.jpg"
            style={{
              aspectRatio: "1920/1080",
              objectFit: "cover",
            }}
            width="1920"
          />
        </div>
        <FormRegister />
      </div>
    )
}