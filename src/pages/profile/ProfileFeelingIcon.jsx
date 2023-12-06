import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFaceAngry,
    faFaceFrown,
    faFaceGrinSquint,
    faFaceLaughBeam,
    faFaceMeh,
    faFaceSadTear,
    faFaceSmile,
    faFaceTired,
} from "@fortawesome/free-solid-svg-icons";

export default function ProfileFeelingIcon(selectedFeeling) {
    switch (selectedFeeling) {
        case "즐거움":
            return (
                <>
                    <FontAwesomeIcon icon={faFaceLaughBeam} bounce /> 즐거움
                </>
            );
        case "우울함":
            return (
                <>
                    <FontAwesomeIcon icon={faFaceFrown} fade /> 우울함
                </>
            );
        case "피곤함":
            return (
                <>
                    <FontAwesomeIcon icon={faFaceTired} fade /> 피곤함
                </>
            );
        case "화남":
            return (
                <>
                    <FontAwesomeIcon icon={faFaceAngry} shake /> 화남
                </>
            );
        case "기쁨":
            return (
                <>
                    <FontAwesomeIcon icon={faFaceGrinSquint} bounce /> 기쁨
                </>
            );
        case "슬픔":
            return (
                <>
                    <FontAwesomeIcon icon={faFaceSadTear} fade /> 슬픔
                </>
            );
        default:
            return (
                <>
                    <FontAwesomeIcon icon={faFaceMeh} fade /> 그냥 그래
                </>
            );
    }
}
