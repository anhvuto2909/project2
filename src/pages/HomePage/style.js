import styled from "styled-components"
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent"

export const WrapperTypeProduct = styled.div`
    font-size: 15px;
    display: flex;
    align-items : center;
    gap : 24px;
    justify-content : flex-start;
    height : 44px;
`

export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover {
        color: #fff;
        background: rgb(13, 92, 182);
        span : {
            color: #fff;
            }
        }
        width: 100%;
        text-align: center;
`

export const WrapperProducts = styled.div`
    border-radius: 5px;
    padding: 3rem;
    gap: 4rem;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    align-items: center;
    justify-content: space-between;
`