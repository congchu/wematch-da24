import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useRouter } from "hooks/useRouter";
import styled, { css } from "styled-components";
import { isEmpty } from "lodash";
import { Checkbox } from "components/wematch-ui/Checkbox";
import Button from "components/common/Button";
import NoticePopup from "components/common/Popup/NoticePopup";
import OneroomNoticePopup from "components/common/Popup/OneroomNoticePopup";
import TermsModal from "components/Modal/TermsModal";
import { showToast } from "components/common/Toast";
import ButtonGroup from "components/common/ButtonGroup";
import MoveInput from "pages/home/components/MoveInput";
import * as commonActions from "store/common/actions";
import * as formSelector from "store/form/selectors";
import * as formActions from "store/form/actions";
import * as userActions from "store/user/actions";
import * as userSelector from "store/user/selectors";
import * as colors from "styles/colors";
import { dataLayer } from "lib/dataLayerUtil";
import { ONEROOM_URL } from "constants/env";
import useHashToggle from "hooks/useHashToggle";
import { useHistory } from "react-router-dom";
import { ESignInCase } from "store/user/types";
import { Question } from "components/Icon";

const Visual = {
  Section: styled.section`
    //padding: 0 24px 80px;
    padding: 0 24px 50px;
  `,
  Container: styled.div`
    padding-top: 32px;
    padding-bottom: 24px;

    strong {
      display: block;
      font-style: normal;
      font-weight: bold;
      font-size: 22px;
      line-height: 30px;
      letter-spacing: -1px;
      color: ${colors.gray33};
    }

    p {
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -1px;
      color: ${colors.gray66};
      margin-bottom: 4px;
    }
  `,
  ButtonGroupContainer: styled.div`
    margin-top: 26px;
  `
};

const Description = {
  Container: styled.div`
    margin-top: 40px;
    margin-bottom: 20px;
  `,
  Box: styled.div`
    padding: 16px;
    border: 1px solid #d7dbe2;
    border-radius: 8px;
    background-color: #f7f8fa;
    letter-spacing: -1px;
    margin-bottom: 16px;

    strong {
      font-weight: 700;
    }

    ul {
      padding-top: 10px;
      line-height: 26px;
    }
  `,
  InfoType: styled.div<{
    selectMoveType: "house" | "oneroom" | "office" | undefined;
  }>`
    display: ${(props) => (props.selectMoveType === "office" ? "block" : "none")};
    text-align: center;
    margin-bottom: 28px;

    p {
      font-size: 16px;
      font-weight: 700;
      line-height: 25px;
      letter-spacing: -0.5px;
    }

    a {
      display: inline-block;
      margin-top: 15px;
      font-size: 15px;
      color: ${colors.pointBlue};
      text-decoration: underline;
      letter-spacing: -0.5px;
    }
  `
};

const Terms = {
  Container: styled.div<{ selectMoveType: boolean }>`
    position: relative;
    display: ${(props) => (props.selectMoveType ? "flex" : "none")};
    margin-bottom: 14px;
    align-items: center;
    margin-top: 24px;
    svg {
      margin-left: 4px;
    }
  `,
  View: styled.div`
    cursor: pointer;
  `,
  CheckWrapper: styled.div`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  `,
  Collapse: styled.div<{ isShow: boolean }>`
    display: none;
    ${(props) =>
      props.isShow &&
      css`
        display: flex;
        flex-direction: column;
        border-top: 1px solid #d7d8e2;
        margin-top: 16px;
      `};
  `,
  NewLink: styled.div`
    display: flex;
    align-items: flex-end;

    a {
      color: ${colors.gray33};
      text-decoration: underline;
      margin-left: 5px;
      line-height: 24px;
      margin-bottom: -2px;
    }
  `,
  SubmitContainer: styled.div<{ selectMoveType: boolean }>`
    display: ${(props) => (props.selectMoveType ? "flex" : "none")};
    flex-direction: column;

    .text {
      margin: 24px 0;
      text-align: center;

      .mobile-enter {
        display: initial;
      }

      p {
        text-align: center;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: -0.03em;
        color: ${colors.gray66};
      }

      strong {
        font-weight: bold;

        &:last-child {
          color: ${colors.pointBlue};
        }
      }
    }

    @media screen and (min-width: 1200px) {
      .text {
        .mobile-enter {
          display: none;
        }
      }
    }
  `,
  LevelInfoWrapper: styled.div<{ visible: boolean }>`
    position: fixed;
    display: ${({ visible }) => (visible ? "flex" : "none")};
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    justify-content: center;
    align-items: center;
    z-index: 3000;
  `,
  LevelInfoBox: styled.div<{ visible: boolean }>`
    position: absolute;
    display: ${({ visible }) => (visible ? "flex" : "none")};
    align-items: center;
    left: 35px;
    top: -17px;
    width: 160px;
    padding: 11px;
    background-color: rgba(0, 0, 0, 0.75);
    border-radius: 4px;
    color: white;
    font-size: 12px;
    line-height: 17px;
    letter-spacing: -1px;
    box-sizing: border-box;
  `,
  Arrow: styled.div`
    position: absolute;
    left: -8px;
    top: 21px;
    width: 0;
    height: 0;
    border-top: 7.5px solid transparent; /* ????????? */
    border-bottom: 7.5px solid transparent;
    border-right: 8px solid rgba(0, 0, 0, 0.75);
  `
};

export enum EFormError {
  DATE = "date",
  START_ADDRESS = "startAddress",
  END_ADDRESS = "endAddress",
  START_FLOOR = "startFloor",
  END_FLOOR = "endFloor"
}

interface Props {
  headerRef?: React.RefObject<HTMLDivElement>;
  isFixed?: boolean;
  setIsFixed?: React.Dispatch<boolean>;
}

const MoveForm = ({ headerRef, isFixed, setIsFixed }: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const router = useRouter();

  const getMoveType = useSelector(formSelector.getType);
  const getMoveDate = useSelector(formSelector.getDate);
  const getAddress = useSelector(formSelector.getAddress);
  const getFloor = useSelector(formSelector.getFloor);
  const getIsMoveStore = useSelector(formSelector.getIsMoveStore);
  const { user } = useSelector(userSelector.getUser);
  const [infoVisible, setInfoVisible] = useState(false);
  const [visibleTerms, setVisibleTerms] = useHashToggle("#terms");
  const [visibleOneroom, setVisibleOneroom] = useState(false);
  const [isVerifySuccess, setIsVerifySuccess] = useState(false);
  const selectedSubmitType = useRef<"curation" | "select" | null>(null);
  const [cookies] = useCookies(["0dj38gepoekf98234aplyadmin", "formData", "jusoData"]);
  const [formValidations, setFormValidations] = useState<EFormError[]>([]);

  const validateHouseOrOfficeForm = () => {
    let errors = [];
    if (isEmpty(getMoveDate)) {
      errors.push(EFormError.DATE);
    }
    if (isEmpty(getAddress.start)) {
      errors.push(EFormError.START_ADDRESS);
    }
    if (isEmpty(getFloor.start)) {
      errors.push(EFormError.START_FLOOR);
    }

    if (isEmpty(getAddress.end)) {
      errors.push(EFormError.END_ADDRESS);
    }
    if (isEmpty(getFloor.end)) {
      errors.push(EFormError.END_FLOOR);
    }

    if (errors.length > 0) {
      setFormValidations(errors);
      showToast({ message: "?????? ????????? ????????? ?????????", type: "error" });
      return false;
    }

    return true;
  };

  const handleRequestClick = (submitType: "curation" | "select") => {
    if (!validateHouseOrOfficeForm()) return;

    dataLayer({
      event: "request",
      category: "?????????_??????_??????_1",
      label: "????????????",
      action: submitType === "curation" ? "??????_????????????" : "??????_???????????????",
      CD6: getMoveType === "house" ? "??????" : "?????????",
      CD10: getIsMoveStore ? "Y" : "N"
    });

    selectedSubmitType.current = submitType;

    dispatch(formActions.setSubmitType(submitType));

    if (!user) {
      dispatch(userActions.signIn({ prevPage: ESignInCase.FORM }));
      history.push("/login");
    } else {
      dispatch(formActions.setMoveData());
    }
  };

  useEffect(() => {
    if (getMoveDate.length > 0) {
      setFormValidations((prev) => prev.filter((valid) => valid !== EFormError.DATE));
    }
    if (!isEmpty(getAddress.start)) {
      setFormValidations((prev) => prev.filter((valid) => valid !== EFormError.START_ADDRESS));
    }

    if (!isEmpty(getAddress.end)) {
      setFormValidations((prev) => prev.filter((valid) => valid !== EFormError.END_ADDRESS));
    }

    if (!isEmpty(getFloor.start)) {
      setFormValidations((prev) => prev.filter((valid) => valid !== EFormError.START_FLOOR));
    }

    if (!isEmpty(getFloor.end)) {
      setFormValidations((prev) => prev.filter((valid) => valid !== EFormError.END_FLOOR));
    }
  }, [getMoveType, getMoveDate, getAddress, getFloor]);

  useEffect(() => {
    const { type } = router.query;
    if (cookies.formData) {
      dispatch(formActions.setInitialFormData(cookies.formData));
    }

    if (cookies.jusoData) {
      dispatch(commonActions.setJuso(cookies.jusoData));
    }

    if (type === "house") {
      dispatch(formActions.setMoveType("house" as formActions.MoveTypeProp));
    }
  }, [dispatch]);

  return (
    <Visual.Section>
      <Visual.Container>
        <p>?????? ?????? ????????????</p>
        <strong>????????? ???????????? ???????????????!</strong>
      </Visual.Container>
      <ButtonGroup
        headerRef={headerRef}
        isFixed={isFixed}
        setIsFixed={setIsFixed}
        onClick={(type: "house" | "oneroom" | "office" | undefined) => {
          setFormValidations([]);
          if (type === "oneroom") {
            document.location.href = `${ONEROOM_URL}`;
            return;
          }
          dispatch(formActions.setMoveType(type as formActions.MoveTypeProp));
        }}
      />
      <Visual.ButtonGroupContainer>
        {/* {getMoveType === undefined && (
          <Description.Container>
            <Description.Box>
              <strong>Q ???????????? ????????? ????????????????</strong>
              <ul>
                <li>- ???????????? : ????????? 2?????????, ?????? ????????? ??????</li>
                <li>- ???????????? : ????????? 1???, 1??? ?????? ?????? ????????????</li>
                <li>- ??????????????? : ??????, ??????, ?????? ??? 1??? ?????? ??????</li>
              </ul>
            </Description.Box>
          </Description.Container>
        )} */}
        {/* <HouseTitle selectMoveType={getMoveType}>
          <strong>????????? 2?????????, ?????? ????????? ??????</strong>
        </HouseTitle> */}
        {/* <Description.InfoType style={{ marginBottom: 0 }} selectMoveType={getMoveType}>
          <p>??????, ??????, ?????? ??? ?????? 1??? ?????? ??????</p>
        </Description.InfoType> */}
        <MoveInput type={getMoveType} style={{ marginTop: 30 }} formValidations={formValidations} />
      </Visual.ButtonGroupContainer>
      <>
        <Terms.Container selectMoveType={getMoveType !== undefined}>
          <Checkbox label="???????????? ??????" checked={getIsMoveStore} onChange={() => dispatch(formActions.setIsMoveStore(!getIsMoveStore))} />
          <div onClick={() => setInfoVisible(true)} style={{ position: "relative", height: 24, display: "flex", alignItems: "center" }}>
            <Question color={colors.gray33} />
            <Terms.LevelInfoBox visible={infoVisible}>
              <Terms.Arrow />
              ????????? ???????????? ????????? ????????? ???????????? ???????????? ???????????????. <br /> ????????? ????????? ??? ????????????.
            </Terms.LevelInfoBox>
            <Terms.LevelInfoWrapper
              visible={infoVisible}
              onClick={(e) => {
                e.stopPropagation();
                setInfoVisible(false);
              }}
            />
          </div>
        </Terms.Container>
        <Terms.SubmitContainer selectMoveType={getMoveType !== undefined}>
          <div className="text">
            <p>
              ??? ????????? ?????? ??????<strong>(?????? 3???)</strong>??? <br className="mobile-enter" />
              ??????????????? ?????? <strong>?????? ????????????</strong>??? ???????????????
            </p>
          </div>
          <div id="dsl_move_button_requests_1">
            {/******* AUTO MATCH *******/}
            <Button theme="primary" bold border onClick={() => handleRequestClick("curation")}>
              ???????????? ?????? ????????????
            </Button>
            {/* {getMoveType !== 'oneroom' && (
                          <Button theme="default" onClick={() => handleRequestClick('select')}>?????? ???????????????</Button>
                        )} */}
          </div>
        </Terms.SubmitContainer>
      </>
      <NoticePopup visible={isVerifySuccess} footerButton border onClose={() => setIsVerifySuccess(!isVerifySuccess)} />
      <TermsModal visible={visibleTerms} onClose={() => setVisibleTerms(!visibleTerms)} />
      <OneroomNoticePopup visible={visibleOneroom} footerButton border onClose={() => setVisibleOneroom(!visibleOneroom)} />
    </Visual.Section>
  );
};

export default MoveForm;
