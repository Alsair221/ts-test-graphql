import 'dotenv/config';
import { PrismaClient, Prisma } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

interface SeedSlugItem {
    name: string;
    slug: string;
}

const dataLevels: Prisma.SkillLevelCreateInput[] = [
    { name: 'Junior', slug: 'junior' },
    { name: 'Middle', slug: 'middle' },
    { name: 'Senior', slug: 'senior' },
];

const dataCompanies: Prisma.CompanyCreateInput[] = [
    { name: 'ООО "ЭИР Продакшн"', slug: 'ooo_air_production' },
    { name: 'ООО "Интернет Медиа Системы"', slug: 'ooo_ims' },
    { name: 'ООО "Воксвеб"', slug: 'ooo_voxveb' },
    { name: 'ООО "МА Эврика"', slug: 'ooo_ma_evrika' },
    { name: 'ООО "Старый кремль"', slug: 'ooo_stariy_creml' },
];

const dataPositions: Prisma.PositionCreateInput[] = [
    { name: 'Back-end разработчик', slug: 'back_end_developer' },
    { name: 'Front-end разработчик', slug: 'front_end_developer' },
    { name: 'Full-stack разработчик', slug: 'full_stack_developer' },
    { name: 'HTML верстальщик', slug: 'html_developer' },
    { name: 'Контент-менеджер', slug: 'content_manager' },
];

const dataSkills: Prisma.SkillCreateInput[] = [
    { name: 'PHP', slug: 'php' },
    { name: 'HTML', slug: 'html' },
    { name: 'JS', slug: 'js' },
    { name: 'Java', slug: 'java' },
    { name: 'C#', slug: 'c_sharp' },
    { name: 'C+', slug: 'c_plus' },
    { name: '1C Bitrix', slug: '1c_bitrix' },
];

const dataProfiles: Prisma.ProfileCreateInput[] = [
    { name: 'Семенов Александр', slug: 'alexandr_semenov', github: 'https://github.com/Alsair221', description: '14 лет с Битриксом: от вёрстки шаблонов до бэкенда на D7 и highload-блоков. Последние 5 лет в air.agency — интеграции (Mindbox, 1С, DaData), кастомная бизнес-логика, оптимизация существующих решений. Не переписываю рабочее «с нуля», умею аккуратно улучшать чужой код. Готов к тестовому заданию.' },
    { name: 'Василий пупкин', slug: 'vasiliy_pipkin', github: 'url', linkedin: 'url', description: 'какое-то описание' },
    { name: 'Пример Примерыч', slug: 'primer_primerich', description: 'какое-то описание' },
    { name: 'Тест Тестов', slug: 'test_testov' },
];

const dataProjects: Prisma.ProjectCreateInput[] = [
    { name: 'Apteka22', slug: 'apteka22', link: 'https://apteka22.ru/' },
    { name: 'Graviton', slug: 'graviton', link: 'https://graviton.ru/' },
    { name: 'Kirpich', slug: 'kirpich', link: 'https://kirpich.ru/' },
    { name: 'Barrier', slug: 'barrier', link: 'https://barrier.ru/' },
    { name: 'Ramt', slug: 'ramt', link: 'https://ramt.ru/' },
    { name: 'Black Hole Online', slug: 'bho', link: 'https://bhonline.ru/' }
];

const dataProfileProjects = [
    { profileSlug: 'alexandr_semenov', projectSlug: 'apteka22' },
    { profileSlug: 'alexandr_semenov', projectSlug: 'graviton' },
    { profileSlug: 'alexandr_semenov', projectSlug: 'kirpich' },
    { profileSlug: 'alexandr_semenov', projectSlug: 'barrier' },
    { profileSlug: 'alexandr_semenov', projectSlug: 'ramt' },
    { profileSlug: 'alexandr_semenov', projectSlug: 'bho' },
    { profileSlug: 'vasiliy_pipkin', projectSlug: 'apteka22' },
    { profileSlug: 'primer_primerich', projectSlug: 'kirpich' },
    { profileSlug: 'test_testov', projectSlug: 'barrier' },
];

const dataExperiences = [
    { profileSlug: 'alexandr_semenov', companySlug: 'ooo_stariy_creml', positionSlug: 'content_manager', dateStart: new Date('2012-02-01'), dateEnd: new Date('2014-04-01'), achievements: 'Наполнение сайтов под CMS 1С Битрикс' },
    { profileSlug: 'alexandr_semenov', companySlug: 'ooo_ma_evrika', positionSlug: 'html_developer', dateStart: new Date('2014-04-01'), dateEnd: new Date('2016-03-01'), achievements: 'написание вёрстки для сайтов по макетам' },
    { profileSlug: 'alexandr_semenov', companySlug: 'ooo_voxveb', positionSlug: 'html_developer', dateStart: new Date('2016-08-01'), dateEnd: new Date('2019-04-01'), achievements: 'Вёрстка дизайнов по макетам\nРабота с сайтами под Yii2 и Wordpress' },
    { profileSlug: 'alexandr_semenov', companySlug: 'ooo_ims', positionSlug: 'full_stack_developer', dateStart: new Date('2019-04-01'), dateEnd: new Date('2021-08-01'), achievements: 'Разработка сетки сайтов под CMS Wordpress (full-stack)' },
    { profileSlug: 'alexandr_semenov', companySlug: 'ooo_air_production', positionSlug: 'back_end_developer', dateStart: new Date('2021-10-01'), dateEnd: new Date('2026-09-01'), achievements: 'Разработка сайтов на CMS Bitrix. Разработка API.\n- Написание программного кода\n- Исправление выявленных багов\n- Тестирование программного кода\n- Интеграции модулей в функционал API\n- Интеграция Mindbox\n- настройка Bitrix, синхронизации данных с 1C' },
    { profileSlug: 'vasiliy_pipkin', companySlug: 'ooo_air_production', positionSlug: 'content_manager', dateStart: new Date('2012-02-01'), dateEnd: new Date('2014-04-01'), achievements: 'Наполнение сайтов под CMS 1С Битрикс' },
    { profileSlug: 'primer_primerich', companySlug: 'ooo_ma_evrika', positionSlug: 'content_manager', dateStart: new Date('2015-02-01'), dateEnd: new Date('2020-04-01'), achievements: 'Наполнение сайтов под CMS 1С Битрикс' },
    { profileSlug: 'test_testov', companySlug: 'ooo_ma_evrika', positionSlug: 'content_manager', dateStart: new Date('2010-02-01'), dateEnd: new Date('2013-04-01'), achievements: 'Наполнение сайтов под CMS 1С Битрикс' },
    { profileSlug: 'test_testov', companySlug: 'ooo_ims', positionSlug: 'content_manager', dateStart: new Date('2019-08-01'), dateEnd: null, achievements: 'Наполнение сайтов под CMS 1С Битрикс' },
    { profileSlug: 'vasiliy_pipkin', companySlug: 'ooo_voxveb', positionSlug: 'content_manager', dateStart: new Date('2020-02-01'), dateEnd: null, achievements: 'Наполнение сайтов под CMS 1С Битрикс' },
];

const dataProfileSkills = [
    { profileSlug: 'alexandr_semenov', skillSlug: 'php', skillLevelSlug: 'senior'},
    { profileSlug: 'alexandr_semenov', skillSlug: 'html', skillLevelSlug: 'senior'},
    { profileSlug: 'alexandr_semenov', skillSlug: 'js', skillLevelSlug: 'middle'},
    { profileSlug: 'alexandr_semenov', skillSlug: 'java', skillLevelSlug: 'junior'},
    { profileSlug: 'alexandr_semenov', skillSlug: 'c_sharp', skillLevelSlug: 'junior'},
    { profileSlug: 'alexandr_semenov', skillSlug: '1c_bitrix', skillLevelSlug: 'senior'},
    { profileSlug: 'vasiliy_pipkin', skillSlug: 'php', skillLevelSlug: 'middle'},
    { profileSlug: 'vasiliy_pipkin', skillSlug: 'html', skillLevelSlug: 'middle'},
    { profileSlug: 'vasiliy_pipkin', skillSlug: 'js', skillLevelSlug: 'junior'},
    { profileSlug: 'primer_primerich', skillSlug: 'php', skillLevelSlug: 'middle'},
    { profileSlug: 'primer_primerich', skillSlug: 'java', skillLevelSlug: 'senior'},
    { profileSlug: 'primer_primerich', skillSlug: 'js', skillLevelSlug: 'junior'},
    { profileSlug: 'test_testov', skillSlug: 'php', skillLevelSlug: 'middle'},
    { profileSlug: 'test_testov', skillSlug: 'c_sharp', skillLevelSlug: 'senior'},
    { profileSlug: 'test_testov', skillSlug: 'c_plus', skillLevelSlug: 'senior'},
];

async function main() {
    //спаравочники
    const levels: Record<string, number> = {};
    for (const dataLvl of dataLevels) {
        await createBySlug(levels, dataLvl, prisma.skillLevel.upsert);
    }
    const skills: Record<string, number> = {};
    for (const dataSkill of dataSkills) {
        await createBySlug(skills, dataSkill, prisma.skill.upsert);
    }
    const companies: Record<string, number> = {};
    for (const dataCompany of dataCompanies) {
        await createBySlug(companies, dataCompany, prisma.company.upsert);
    }
    const positions: Record<string, number> = {};
    for (const dataPosition of dataPositions) {
        await createBySlug(positions, dataPosition, prisma.position.upsert);
    }
    const projects: Record<string, number> = {};
    for (const dataProject of dataProjects) {
        await createBySlug(projects, dataProject, prisma.project.upsert);
    }

    //профили
    const profiles: Record<string, number> = {};
    for (const dataProfile of dataProfiles) {
        await createBySlug(profiles, dataProfile, prisma.profile.upsert);
    }

    //Связи с проектами
    for (const dataProfileProject of dataProfileProjects) {
        const data = {
            profileId: profiles[dataProfileProject.profileSlug],
            projectId: projects[dataProfileProject.projectSlug],
        };
        await prisma.profileProject.upsert({
            where: { profileId_projectId: {profileId: data.profileId, projectId: data.projectId} },
            update: {},
            create: data,
        });
    }

    //связи со скиллами
    for (const dataProfileSkill of dataProfileSkills) {
        const data = {
            profileId: profiles[dataProfileSkill.profileSlug],
            skillId: skills[dataProfileSkill.skillSlug],
            skillLevelId: levels[dataProfileSkill.skillLevelSlug],
        };
        await prisma.profileSkill.upsert({
            where: { profileId_skillId: {profileId: data.profileId, skillId: data.skillId} },
            update: {},
            create: data,
        });
    }

    //опыт работы
    for (const dataExperience of dataExperiences) {
        const data = {
            profileId: profiles[dataExperience.profileSlug],
            companyId: companies[dataExperience.companySlug],
            positionId: positions[dataExperience.positionSlug],
            dateStart: dataExperience.dateStart,
            dateEnd: dataExperience.dateEnd,
            achievements: dataExperience.achievements
        };
        await prisma.experience.create({
            data
        });
    }
}

type UpsertFn = (args: {
    where: { slug: string };
    update: Record<string, never>;
    create: SeedSlugItem;
}) => Promise<{ id: number; slug: string }>;

async function createBySlug( list : Record<string, number>, data : SeedSlugItem, upsert: UpsertFn) {
    const element = await upsert(
        {
            where: { slug: data.slug },
            update: {},
            create: data
        }
    );
    list[element.slug] = element.id;
}

main()
    .then(() => console.log('Seed done'))
    .finally(() => prisma.$disconnect());