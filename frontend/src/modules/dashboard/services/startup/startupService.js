import apiStartups from "../../../../core/api/startup";

const registerStartup = async (formData) => {
    try {
        await apiStartups.post('/startups/register/', formData);
    } catch (err) {
        console.error("Error registrando la startup", err);
        throw err;
    }
};

export default registerStartup;
