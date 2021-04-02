import React, {useEffect, useState} from 'react'
import styled, {css} from 'styled-components'
import {useDispatch, useSelector} from "react-redux"
import useHashToggle from 'hooks/useHashToggle'
import {isEmpty, every} from 'lodash'

import Layout from 'components/base/Layout'
import Input from 'components/common/Input'
import Select from 'components/common/Select'

import * as colors from 'styles/colors'
import {ContactFormData} from 'types/backoffice'
import * as backofficeActions from 'store/backoffice/actions'
import * as backofficeSelector from 'store/backoffice/selectors'
import {debounce} from 'lodash'

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
      margin: 0 auto;
      width: 100%;
      
      @media screen and (max-width: 768px) {
        width: 90%;
        padding: 0 0 82px 0;
      }
      @media screen and (max-width: 1200px) and (min-width: 769px) {
        width: 100%;
        padding: 40px 0 82px 0;
      }
    `,
    Group: styled.div`
        display: flex;
        flex-direction: row;
    `,
    TextContainer: styled.div`
        overflow: hidden;
        position: relative;
        padding: 12px 16px;
        border: 1px solid ${colors.lineDefault};
        background-color: #f8f9fb;
        border-radius: 4px  ;
      
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
        padding-left: 0px;
    `,
    Button: styled.button`
      display: block;
      width: 100%;
      height: 56px;
      font-size: 18px;
      background: #1672F7;
      color: #fff;
      cursor: pointer;
      
      @media screen and (max-width: 768px) {
        position: fixed;
        bottom: 0;
        right: 0
      }
      @media screen and (max-width: 1200px) {
        position: fixed;
        bottom: 0;
        right: 0
      }
      &:disabled {
        background-color: ${colors.lineDefault};
        cursor: not-allowed;
      }
      
    `,
}

const Category = [
    { key: '이사', value: '이사' },
    { key: '청소', value: '청소' },
    { key: '이사+청소', value: '이사+청소' },
]

const Type = [
    { key: '개인적인 궁금한 것', value: '개인적인 궁금한 것' },
    { key: '기타', value: '기타' }
]

function ContactPage() {

    const dispatch = useDispatch()
    const getContactStatus = useSelector(backofficeSelector.getContactStatus)

    const [visibleCategoryModal, setVisibleCategoryModal] = useHashToggle('#category')
    const [visibleTypeModal, setVisibleTypeModal] = useHashToggle('#type')
    const toggleCategory = () => setVisibleCategoryModal(!visibleCategoryModal)
    const toggleType = () => setVisibleTypeModal(!visibleTypeModal)

    const [name, setName] = useState('');
    const [tel, setTel] = useState('');
    const [contents, setContents] = useState('');
    const [contactType, setContactType] = useState<string>('');
    const [serviceType, setServiceType] = useState<string>('');
    const [completed, setCompleted] = useState<boolean>(false);

    const initObj = {
        contact_type: contactType,
        name: name,
        tel: tel,
        contents: contents,
        service_type: serviceType,
    }

    const selectContactType = (data: string ) => {
        setContactType(data)
    }
    const selectServiceType = (data:string) => {
        setServiceType(data)
    }

    useEffect(()=>{
        if(every(initObj)){
            setCompleted(true)
        }
    },[name, contactType, tel, contents, serviceType])

    const debounceSubmitHandler = debounce(() => {
        const formData : ContactFormData = {
            contact_type: contactType,
            name: name,
            tel: tel,
            contents: contents,
            service_type: serviceType,
        }
        dispatch(backofficeActions.submitContactFormAsync.request({formData: formData}))
    }, 500);

    useEffect(()=>{
        if(getContactStatus === "success") {
            setContactType('')
            setName('')
            setTel('')
            setContents('')
            setServiceType('')
            setCompleted(false)
        }
    },[getContactStatus])


    return(
        <Layout title='문의하기'>
            <S.Form>
                <Input theme = "default" border placeholder="이름" rootStyle={{}} maxLength={20}
                       style = {{ fontSize: "16px", color: colors.black}}
                       onBlur = {(e) => {}}
                       value = { name }
                       onChange = {(e)=> {setName(e.target.value)}}
                />
                <Input theme = "default" type="tel" pattern="[0-9]*" inputMode="numeric"
                       placeholder = "휴대전화번호 입력 ('-'없이)" border rootStyle={{}} maxLength={13}
                       style = {{ fontSize: "16px", color: colors.black}}
                       onBlur = {(e) => {}}
                       value = { tel }
                       onChange = {(e)=> {setTel(e.target.value)}}
                />
                <Input theme = "default" border readOnly icon="down"
                       placeholder = "공통" rootStyle={{}}
                       style = {{ fontSize: "16px", color: colors.black,
                       }}
                       onClick = {toggleCategory}
                       value = { serviceType }
                />
                <Input theme = "default"
                       border readOnly icon = "down"
                       placeholder = "문의형태" rootStyle={{}}
                       style = {{ fontSize: "16px", color: colors.black}}
                       onClick = { toggleType }
                       value = { contactType }
                />
                <S.TextContainer>
                    <S.Textarea placeholder="문의내용"
                                style={{ fontSize: "16px"}}
                                value={contents}
                                onChange={(e)=> {setContents(e.target.value)}}
                    />
                </S.TextContainer>
            </S.Form>
            <Select visible={visibleCategoryModal} items={Category} onOverlayClose={toggleCategory} onClose={toggleCategory} onSelect={selectServiceType}/>
            <Select visible={visibleTypeModal} items={Type} onOverlayClose={toggleType} onClose={toggleType} onSelect={selectContactType} />
            <S.Button theme={"primary"} disabled={!completed} onClick={() => debounceSubmitHandler() }>확인</S.Button>
        </Layout>

    )

}

export default ContactPage