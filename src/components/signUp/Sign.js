import { useEffect } from "react";
import "../../assets/css/Sign.css";
import showToast from "../../utils/ShowToast";
import SiginImg from "../../assets/image/Sign.png";
import SignForm from "./SignForm";

export default function Sigin(){
      useEffect(() => {
          const loggedOut = sessionStorage.getItem("Sign");
          if (loggedOut) {
              showToast({
                  title: "Registration successful!",
                  icon: "success",
                  timer: 2000,
                  position: "top-end"
              });
              sessionStorage.removeItem("loggedOut");
          }
      }, []);

      return(
        <div class="login-page">
            <div class="left-section">
                <img
                    alt="White headphones resting on a stack of colorful books in pink, orange, yellow, and green covers"
                    className="absolute top-1/2 left-1/2 w-auto min-w-full min-h-full max-w-none -translate-x-1/2 -translate-y-1/2 object-cover"
                    src={SiginImg}
                />
            </div>
            <div class="right-section">
                <SignForm />
            </div>
              
        </div>
      )
}