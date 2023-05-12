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
      <tr key={idx} className="border-y-2">
        <th className="text-start px-10 py-2 border-r-2">{marketData.companyName}</th>
        <th className="text-start px-10 py-2 border-r-2">{marketData.companyKind}</th>
        <th className="text-start px-10 py-2 border-r-2">{marketData.average.toLocaleString()}</th>
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
        <div className="bg-[#ff9797] flex justify-center items-center px-10 py-10 rounded-xl text-white">
          <table>
            <thead>
              <tr className="text-[1.3rem] text-start border-2">
                <th className="px-10 py-2 border-r-2">companyName</th>
                <th className="px-10 py-2 border-r-2">companyKind</th>
                <th className="px-10 py-2 border-r-2">average</th>
              </tr>
            </thead>
            <tbody className="text-white border-2">{tbodyData}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default AdminMarketModal;
