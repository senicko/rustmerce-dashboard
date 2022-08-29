import { Asset } from "../../types/product";
import Image from "next/image";

export interface AssetPreviewProps {
  assets: Asset[];
  visibleCount: number;
}

export const AssetPreview = ({ assets, visibleCount }: AssetPreviewProps) => {
  return (
    <div className="flex h-full items-center">
      {assets.slice(0, visibleCount).map((asset) => (
        // TODO: Change this later when api will provide image width / height
        <div
          key={asset.id}
          className="relative ml-[-16px] aspect-square h-8 overflow-hidden rounded-full border border-white first:ml-0"
        >
          <Image
            src={`http://localhost:8080/assets/${asset.filename}`}
            alt="Asset preview"
            layout="fill"
            objectFit="cover"
          />
        </div>
      ))}
      {assets.length > visibleCount && (
        <span className="ml-1 rounded-full border border-gray-200 bg-gray-100 px-2 text-xs text-gray-500">
          +{assets.length - 1}
        </span>
      )}
    </div>
  );
};
