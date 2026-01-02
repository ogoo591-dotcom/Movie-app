"use client";
import { EmailIcon } from "../_icons/EmailIcon";
import { MovieZIcon } from "../_icons/MovieZIcon";
import { PhoneIcon } from "../_icons/PhoneIcon";

export const Footer = () => {
  return (
    <div className="w-full h-[280px] sm:h-[350px] bg-blue-600 flex justify-center sm:gap-0 items-center">
      <div className="max-w-[1280px] h-[200px] flex sm:flex-row flex-col gap-5 sm:gap-90 text-white font-normal">
        <div className="cursor-pointer ">
          <MovieZIcon />
          <p className="mt-3">© 2024 Movie Z. All Rights Reserved.</p>
        </div>
        <div className="flex flex-row max-sm:gap-20 gap-40  ">
          <div className="flex flex-col gap-3">
            <p>Contact Information</p>
            <div className="flex flex-row items-center gap-3 cursor-pointer ">
              <EmailIcon />
              <div>
                <p>Email:</p>
                <button className="underline cursor-pointer">
                  support@movieZ.com
                </button>
              </div>
            </div>
            <div className="flex flex-row items-center gap-3 cursor-pointer ">
              <PhoneIcon />
              <div>
                <p>Phone:</p>
                <button className="underline cursor-pointer">
                  +976 (11) 123-4567
                </button>
              </div>
            </div>
          </div>
          <div>
            <div>
              <p>Follow us </p>
              <div className="flex gap-2 underline max-sm:flex-col  ">
                <button className="cursor-pointer">Facebook</button>
                <button className="cursor-pointer">Instagram</button>
                <button className="cursor-pointer">Twitter</button>
                <button className="cursor-pointer">Youtube</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
