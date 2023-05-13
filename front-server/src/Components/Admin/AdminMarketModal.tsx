import { useRef } from 'react';

interface SelectMarketDataType {
  companyName: string;
  companyKind: string;
  average: number;
}

interface AdminMarketModalProps {
  selectMarketData: SelectMarketDataType[];
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
}

function AdminMarketModal({ selectMarketData, setIsClick }: AdminMarketModalProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const tbodyData = selectMarketData.map((marketData, idx) => {
    return (
      <tr key={idx} className="border-y-2 border-y-[#A87E6E]">
        <th className="text-start px-10 py-2 border-r-2 border-r-[#A87E6E]">{marketData.companyName}</th>
        <th className="text-start px-10 py-2 border-r-2 border-r-[#A87E6E]">{marketData.companyKind}</th>
        <th className="text-start px-10 py-2 border-r-2 border-r-[#A87E6E]">
          {marketData.average.toLocaleString()} 원
        </th>
      </tr>
    );
  });
  return (
    <>
      <div
        ref={ref}
        className="fixed flex items-center justify-center right-0 left-0 top-0 bottom-0 z-50 bg-[#707070]/50 pt-0"
        onClick={(e) => {
          if (e.target === ref.current) {
            setIsClick(false);
          }
        }}>
        <div className="bg-white flex justify-center items-center px-10 py-10 rounded-xl text-[#A87E6E]">
          <table>
            <thead>
              <tr className="text-[1.3rem] border-2 border-[#A87E6E] border-r-[#A87E6E]">
                <th className="px-10 py-2 border-r-2 border-r-[#A87E6E]">companyName</th>
                <th className="px-10 py-2 border-r-2 border-r-[#A87E6E]">companyKind</th>
                <th className="px-10 py-2 border-r-2 border-r-[#A87E6E]">average</th>
              </tr>
            </thead>
            <tbody className="border-2 border-[#A87E6E]">{tbodyData}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default AdminMarketModal;
