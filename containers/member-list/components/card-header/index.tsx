import { LOGO_SMALL_URL } from "@constants";
import { useResponsive } from "@hooks";
import { Avatar } from "antd";
import { T } from "i18n";
import { IMember } from "interfaces";
import { useEffect, useState } from "react";
import { HeaderWrapper } from "./style";

interface Props {
  member: Partial<IMember>;
  isModal?: boolean;
}

export const CardHeader: React.FC<Props> = ({ member, isModal = false }) => {
  const {image: memberImage, name, age} = member;
  const [image, setImage] = useState<string>(LOGO_SMALL_URL);
  const { imageSize } = useResponsive();

  useEffect(() => {
    memberImage && setImage(memberImage);
  }, [memberImage]);

  return (
    <HeaderWrapper {...{isModal}}>
      <Avatar 
        src={image} 
        shape='circle' 
        onError={() =>{ setImage(LOGO_SMALL_URL); return false}}
        size={imageSize}
      />
      <div>
        <p>{name}</p>
        {age && <p>{T.AGE}: {age}</p>}
      </div>
    </HeaderWrapper>)
}