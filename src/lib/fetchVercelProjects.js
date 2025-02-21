export const fetchVercelProjects = async () => {
    const token = process.env.NEXT_PUBLIC_VERCEL_API_TOKEN;

    if (!token) {
        throw new Error('Vercel API Token is missing!');
    }

    const response = await fetch('https://api.vercel.com/v8/projects', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch projects from Vercel');
    }

    const data = await response.json();
    const projects = data.projects;

    // 🔍 جلب نطاقات كل مشروع للحصول على الروابط الصحيحة
    const projectsWithDomains = await Promise.all(
        projects.map(async (project) => {
            const domainResponse = await fetch(`https://api.vercel.com/v9/projects/${project.id}/domains`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (domainResponse.ok) {
                const domainData = await domainResponse.json();
                project.domains = domainData.domains.map(domain => domain.name); // استخراج النطاقات
            } else {
                project.domains = []; // تجنب الأخطاء في حال لم يكن هناك نطاقات
            }

            return project;
        })
    );

    return projectsWithDomains;
};
