import CommonVideo from "../../../../../commonComponents/CommonVideo";
import CommonImage from "../../../../../commonComponents/CustomeImage";

export default function MediaGrid({ images = [], videos = [], onMediaClick }) {
  const count = images.length;
  const haveVideo = videos.length;

  const imgShadow = "shadow-[0_2px_6px_rgba(0,0,0,0.15)] cursor-pointer";
  const radius = "rounded-lg";

  // CLICK HANDLER (image/video click)
  const handleClick = (i) => {
    if (onMediaClick) onMediaClick(i);
  };

  // VIDEO
  if (haveVideo) {
    return (
      <div
        className="relative w-[250px] cursor-pointer"
        onClick={() => handleClick(0)}
      >
        <CommonVideo
          src={videos[0]}
          className={`w-full ${radius} object-cover ${imgShadow}`}
          style={{ aspectRatio: "1.3/1" }}
          preload="metadata"
          muted
          controls={false}
        />
        {/* play icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black/30 p-1 rounded-full">
            <div className="bg-white rounded-full p-3 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="black"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SIZES
  const square = `w-full aspect-square ${radius} object-cover ${imgShadow}`;
  const rectangle = `w-full h-[150px] ${radius} object-cover ${imgShadow}`;

  // 1 IMAGE
  if (count === 1) {
    return (
      <div className="w-[250px]" onClick={() => handleClick(0)}>
        <CommonImage
          src={images[0]}
          className={`w-full ${radius} object-cover ${imgShadow}`}
          style={{ aspectRatio: "1.3/1" }}
        />
      </div>
    );
  }

  // 2 IMAGES
  if (count === 2) {
    return (
      <div className="grid grid-cols-2 gap-1 w-[250px] ">
        {images.map((img, i) => (
          <CommonImage
            key={i}
            src={img}
            className={square}
            onClick={() => handleClick(i)}
          />
        ))}
      </div>
    );
  }

  // 3 IMAGES
  if (count === 3) {
    return (
      <div className="grid grid-cols-2 gap-1 w-[250px] ">
        <CommonImage
          src={images[0]}
          className={`${rectangle} col-span-2`}
          onClick={() => handleClick(0)}
        />
        <CommonImage
          src={images[1]}
          className={square}
          onClick={() => handleClick(1)}
        />
        <CommonImage
          src={images[2]}
          className={square}
          onClick={() => handleClick(2)}
        />
      </div>
    );
  }

  // 4+
  return (
    <div className="grid grid-cols-2 gap-1 w-[250px] ">
      {images.slice(0, 4).map((img, i) => (
        <div key={i} className="relative" onClick={() => handleClick(i)}>
          <CommonImage src={img} className={square} />

          {i === 3 && count > 4 && (
            <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center text-white text-xl font-semibold cursor-pointer">
              +{count - 4}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
