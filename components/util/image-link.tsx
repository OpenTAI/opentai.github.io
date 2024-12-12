import Link from "next/link";
import Image from "next/image";

export const ImageLink = ({
  src,
  width,
  height,
  href = "",
  className = "",
  tinaField = "",
  target = "_blank"
}) => {
  if (href) {
    return (
      <Link href={href} target={target}>
        <Image
          src={src}
          className={className}
          alt=""
          width={width}
          height={height}
          data-tina-field={tinaField}
        />
      </Link>
    );
  } else {
    return (
      <Image
        src={src}
        className={className}
        alt=""
        width={width}
        height={height}
        data-tina-field={tinaField}
      />
    );
  }
};
