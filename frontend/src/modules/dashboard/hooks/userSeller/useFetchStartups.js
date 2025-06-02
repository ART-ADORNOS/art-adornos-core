import {useEffect, useState} from 'react';
import {getStartup} from '../../../startup/services/startupGet';
import {useNotification} from '../../../../shared/providers/alertProvider';

const useFetchStartups = () => {
    const [startupData, setStartupData] = useState([]);
    const [loading, setLoading] = useState(true);
    const {showNotification} = useNotification();

    useEffect(() => {
        const fetchStartup = async () => {
            setLoading(true);
            try {
                const data = await getStartup();
                const normalizedData = data.map(startup => ({
                    ...startup,
                    industry: Array.isArray(startup.industry) ? startup.industry : [startup.industry]
                }));
                setStartupData(normalizedData);
            } catch {
                showNotification("Error al cargar la información de la startup", "error");
            } finally {
                setLoading(false);
            }
        };
        fetchStartup();
    }, [showNotification]);

    return {startupData, loading};
};

export default useFetchStartups;
