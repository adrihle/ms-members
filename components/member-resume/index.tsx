import { LOGO_SMALL_URL } from "@constants";
import { useResponsive } from "@hooks";
import { Avatar } from "antd";
import { T } from "i18n";
import { IMember } from "interfaces";
import { useState, useEffect } from "react";
import { HeaderWrapper, Wrapper } from "./style";

interface CardHeaderProps {
  member: Partial<IMember>;
  isModal?: boolean;
}

const CardHeader: React.FC<CardHeaderProps> = ({ member, isModal = false }) => {
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

interface MemberResumeProps {
  member: Partial<IMember>;
  showBio?: boolean;
  isModal?: boolean;
}

export const MemberResume: React.FC<MemberResumeProps> = ({ member, showBio = false, isModal = false }) => {
  const { bio } = member;
  return (
    <Wrapper>
    <CardHeader {...{member, isModal}}/>
    {showBio && (
      <div>
        {T.BIO}: 
        <p>{bio}</p>
      </div>
    )}
  </Wrapper>
  )
}