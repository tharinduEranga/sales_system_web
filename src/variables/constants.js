const SERVER_URL_PROD = `http://localhost:8080/api/v1`;
const SERVER_URL_DEV = `http://localhost:8080/api/v1`;

const USER_ROLE_KEY = 'userRole';

const USER_ROLES = Object.freeze({
    HEAD_OFFICE_ADMIN: `HEAD_OFFICE_ADMIN`,
    BRANCH_ADMIN: `BRANCH_ADMIN`
});

export {SERVER_URL_DEV, SERVER_URL_PROD, USER_ROLE_KEY, USER_ROLES};