import {useContext} from 'react';
import {RouterContext} from './Context';

export function useHistory() {
    console.log(useContext(RouterContext));
    
    return useContext(RouterContext).history
}

export function useLocation() {
    return useContext(RouterContext).location
}

export function useRouteMatch() {
    return useContext(RouterContext).match
}

export function useParams() {
    const match = useContext(RouterContext).match
    return match ? match.params : {}
}