import React from 'react'
import styled from 'styled-components'
import * as colors from 'styles/colors'

import Layout from 'components/base/Layout';
import * as formActions from "../../store/form/actions";
import {dataLayer} from "../../lib/dataLayerUtil";
import Input from "../../components/common/Input";
import useHashToggle from "../../hooks/useHashToggle";
import Select from "../../components/common/Select";
import Button from "../../components/common/Button";


const S = {
    Container: styled.div``,
    Title: styled.h3`
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.03em;
      color: ${colors.gray66};
      margin-bottom: 16px;
    `,
    Form: styled.form`
        display: flex;
        flex-direction: column;
        padding-bottom: 66px;
        input {
          margin-bottom: 16px;
        }
    `,
    Group: styled.div`
        display: flex;
        flex-direction: row;
    `,
    TextContainer: styled.div`
        overflow: hidden;
        position: relative;
        height: 80px;
        padding: 12px 16px;
        border: 1px solid ${colors.lineDefault};
        background-color: #f8f9fb;
    `,
    Textarea: styled.textarea`
        display: block;
        width: 100%;
        border: 0 none;
        resize: none;
        outline: none;
        background-color: transparent;
        letter-spacing: -1px;
        height: 110px;
        font-size: 16px;
        line-height: 28px;
        border-radius: 4px;
    `
}

const Category = [
    { key: '1', value: '이사' },
    { key: '2', value: '청소' },
    { key: '3', value: '이사+청소' },
]

function ContactPage() {

    const [visibleCategoryModal, setVisibleCategoryModal] = useHashToggle('#category')
    const toggleCategory = () => setVisibleCategoryModal(!visibleCategoryModal)

    return(
        <Layout title='문의하기'>
            <S.Form>
                <Input theme="default" border placeholder="이름" rootStyle={{}}
                       maxLength={20}
                       style={{ fontSize: "18px" }}
                       onBlur={(e) => {}}
                />
                <Input theme="default" type="tel" pattern="[0-9]*" inputMode="numeric"
                       placeholder="휴대전화번호 입력 ('-'없이)" border rootStyle={{}} maxLength={13}
                       style={{ fontSize: "18px" }}
                       onBlur={(e) => {}}
                />
                <Input theme="default"
                       border readOnly icon="down"
                       placeholder="공통" rootStyle={{}}
                       style={{ fontSize: "18px" }}
                       onClick={toggleCategory}
                />
                <Input theme="default"
                       border readOnly icon="down"
                       placeholder="문의형태" rootStyle={{}}
                       style={{ fontSize: "18px" }}
                       onClick={toggleCategory}
                />
                <S.TextContainer>
                    <S.Textarea placeholder="문의내용"
                                style={{ fontSize: "18px" }}
                                onChange={(e) => {}}/>
                </S.TextContainer>
            </S.Form>

            <Select
                visible={visibleCategoryModal}
                items={Category}
                onOverlayClose={toggleCategory}
                onClose={toggleCategory}
            />
            <Button theme={"primary"}>확인</Button>
        </Layout>

    )

}

export default ContactPage