"use client";

import { useState, useEffect } from "react";

const sizeData = [
  { size: "XS", chest: "82-86", waist: "62-66", hip: "88-92" },
  { size: "S", chest: "86-90", waist: "66-70", hip: "92-96" },
  { size: "M", chest: "90-94", waist: "70-74", hip: "96-100" },
  { size: "L", chest: "94-98", waist: "74-78", hip: "100-104" },
  { size: "XL", chest: "98-102", waist: "78-82", hip: "104-108" },
];

export default function SizeGuide() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-xs text-primary-600 hover:text-primary-700 font-medium underline underline-offset-2 transition-colors"
      >
        Beden Rehberi
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[85vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-neutral-100">
              <h2 className="text-lg font-bold text-neutral-900">
                Beden Rehberi
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Size Table */}
            <div className="p-5">
              <div className="overflow-hidden rounded-xl border border-neutral-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-neutral-50">
                      <th className="px-4 py-3 text-left font-semibold text-neutral-700">
                        Beden
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-neutral-700">
                        Gogus (cm)
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-neutral-700">
                        Bel (cm)
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-neutral-700">
                        Kalca (cm)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {sizeData.map((row) => (
                      <tr key={row.size} className="hover:bg-neutral-50 transition-colors">
                        <td className="px-4 py-3 font-semibold text-primary-600">
                          {row.size}
                        </td>
                        <td className="px-4 py-3 text-center text-neutral-600">
                          {row.chest}
                        </td>
                        <td className="px-4 py-3 text-center text-neutral-600">
                          {row.waist}
                        </td>
                        <td className="px-4 py-3 text-center text-neutral-600">
                          {row.hip}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Measurement Tips */}
              <div className="mt-5 p-4 bg-primary-50 rounded-xl">
                <h3 className="text-sm font-semibold text-primary-700 mb-2">
                  Olcum Ipuclari
                </h3>
                <ul className="space-y-1.5 text-xs text-primary-600 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary-400 mt-1.5 flex-shrink-0" />
                    Gogus: Gogus hizasindan, kollarinizin altindan yatay olarak olcun.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary-400 mt-1.5 flex-shrink-0" />
                    Bel: En dar noktadan, genellikle gobek deliginizin biraz uzerinden olcun.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary-400 mt-1.5 flex-shrink-0" />
                    Kalca: Kalcanizin en genis noktasindan yatay olarak olcun.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary-400 mt-1.5 flex-shrink-0" />
                    Olcum sirasinda metre seridinin vucut hattinizi sikmadan saracak sekilde tutun.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
