import { useQuery } from "@tanstack/react-query";
import { getLongUrl } from "@/services/api/";
import { useNavigate } from "react-router-dom";

const Short = () => {
    const navigate = useNavigate();

    const key = window.location.pathname.replace('/', '')

    const { data, isSuccess } = useQuery({
        queryKey: ['short'],
        queryFn: () => getLongUrl(key),
    });

    if (isSuccess && data) {
        return window.location.replace(data);
    }

    return navigate('/');
}

export default Short;
