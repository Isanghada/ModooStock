import { useLazyGetAdminAssetQuery } from 'Store/api';
import { useEffect, useState } from 'react';
import AdminAssetModal from './AdminAssetModal';

interface AdminAssetType {
  assetCategory: string;
  assetId: number;
  assetImagePath: string;
  assetLevel: string;
}

function AdminAsset(): JSX.Element {
  const [getAdminAsset, { isLoading: isLoading1, isError: isError1 }] = useLazyGetAdminAssetQuery();
  // const [getAdminMarketSelect, { isLoading: isLoading2, isError: isError2 }] = useLazyGetAdminMarketSelectQuery();
  const [tbodyData, setTbodyData] = useState<any>();
  const [isClick, setIsClick] = useState<boolean>(false);
  const [selectAssetData, setSelectAssetData] = useState<AdminAssetType>({
    assetCategory: '',
    assetId: 0,
    assetImagePath: '',
    assetLevel: ''
  });

  const click = (asset: AdminAssetType) => {
    setSelectAssetData(asset);
  };

  useEffect(() => {
    const getAsset = async () => {
      const body = {
        assetLevel: 'EPIC',
        category: 'PROP'
      };
      const { data, result } = await getAdminAsset(body).unwrap();
      console.log(data);
      setTbodyData(
        data.map((asset, idx) => {
          return (
            <tr
              key={idx}
              className="transition-all duration-300 cursor-pointer hover:bg-[#ff9797] hover:text-white border-y-4 border-y-[#A87E6E] lg:text-[0.8rem] xl:text-[1.2rem] text-[#A87E6E]"
              onClick={() => {
                click(asset);
                setIsClick(true);
              }}>
              <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{asset.assetId}</th>
              <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{asset.assetCategory}</th>
              <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{asset.assetLevel}</th>
              {/* <th className="py-1 border-x-4 border-x-[#A87E6E]/80">{asset.assetCategory.split('T')[0]}</th> */}
            </tr>
          );
        })
      );
    };
    getAsset();
  }, []);

  return (
    <>
      {isClick && <AdminAssetModal selectAssetData={selectAssetData} setIsClick={setIsClick} />}
      <div className="w-full flex-col flex justify-center items-center">
        <div className="w-full flex justify-center text-[2.2rem] text-[#A87E6E] font-bold mb-3">에셋 목록 관리</div>
        <div className="w-full mb-4 font-bold flex justify-between">
          <span className="text-[1.4rem] text-[#A87E6E] border-b-4 border-b-[#A87E6E]/70">에셋</span>
        </div>
        <div className="overflow-y-auto h-[50vh] w-full">
          <div className="flex justify-center items-start ">
            <table className="w-full">
              <thead>
                <tr className="border-y-4 border-y-[#A87E6E] lg:text-[0.8rem] xl:text-[1.2rem] text-[#A87E6E] bg-[#ffe8d5]">
                  <th className="py-1 border-x-4 border-x-[#A87E6E]/80">assetId</th>
                  <th className="py-1 border-x-4 border-x-[#A87E6E]/80">assetCategory</th>
                  <th className="py-1 border-x-4 border-x-[#A87E6E]/80">assetLevel</th>
                  <th className="py-1 border-x-4 border-x-[#A87E6E]/80">assetImagePath</th>
                </tr>
              </thead>
              <tbody>{tbodyData}</tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminAsset;
