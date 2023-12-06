import {
  faFaceAngry,
  faFaceFrown,
  faFaceGrinSquint,
  faFaceLaughBeam,
  faFaceMeh,
  faFaceSadTear,
  faFaceSmile,
  faFaceTired,
} from '@fortawesome/free-solid-svg-icons';

export const getFeelingIcon = (feeling) => {
  switch (feeling) {
    case "즐거움": return faFaceLaughBeam;
    case "우울함": return faFaceFrown;
    case "피곤함": return faFaceTired;
    case "화남": return faFaceAngry;
    case "기쁨": return faFaceGrinSquint;
    case "슬픔": return faFaceSadTear;
    case "그냥 그래": return faFaceMeh;
    default: return faFaceMeh;
  }
};
