import { CancelledIcon } from "../_icons/Cancelled";
import { SumIcon } from "../_icons/Sum";

`use client`;

export const OrderCards = () => {
  return (
    <div className="w-full h-[60px] flex justify-center items-center bg-white hover:bg-gray-100 gap-10 text-sm">
      <input type="checkbox" />
      <p>1</p>
      <p>Test@gmail.com</p>

      <div className="flex gap-8 justify-center items-center">
        <h2>2 foods</h2>
        <SumIcon />
      </div>
      <div>2024/12/20</div>
      <p>$26.97</p>
      <h1 className="text-sm">
        2024/12/СБД, 12-р хороо СБД <br />
        нэгдсэн эмнэлэг Sbd negdsen emneleg{" "}
      </h1>
      <button className="w-34 h-8 flex justify-center items-center gap-3 border rounded-full p-4 font-medium text-l">
        <h1>Cancelled</h1>
        <CancelledIcon />
      </button>
    </div>
  );
};
