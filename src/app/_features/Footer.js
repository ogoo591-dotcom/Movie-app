import { EmailIcon } from "../_icons/EmailIcon";
import { PhoneIcon } from "../_icons/PhoneIcon";

export const Footer = () => {
  return (
    <div className="w-full h-[280px] bg-blue-600 flex justify-center items-center">
      <div className="w-[1280px] h-[200px] flex flex-row gap-90 text-white font-normal">
        <div>
          <img src="Logo.png" />
          <p className="mt-3">© 2024 Movie Z. All Rights Reserved.</p>
        </div>
        <div className="flex flex-row gap-40">
          <div className="flex flex-col gap-3">
            <p>Contact Information</p>
            <div className="flex flex-row items-center gap-3 ">
              <EmailIcon />
              <div>
                <p>Email:</p>
                <button className="underline">support@movieZ.com</button>
              </div>
            </div>
            <div className="flex flex-row items-center gap-3 ">
              <PhoneIcon />
              <div>
                <p>Phone:</p>
                <button className="underline">+976 (11) 123-4567</button>
              </div>
            </div>
          </div>
          <div>
            <div>
              <p>Follow us </p>
              <div className="flex gap-2 underline">
                <button>Facebook</button>
                <button>Instagram</button>
                <button>Twitter</button>
                <button>Youtube</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
