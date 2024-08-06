export const url = 'https://learn.reboot01.com/api/graphql-engine/v1/graphql';

export const queryReceiveAuditPass = `query Audit_aggregate {
    audit_aggregate(
        where: {
            result: { path: { _like: "/bahrain/bh-module%" }}
            grade: {_gte: "1"}
        }
    ) {
        aggregate {
            count
        }
    }
}`;

export const queryReceiveAuditFail = `query Audit_aggregate {
    audit_aggregate(
        where: {
            result: { path: { _like: "/bahrain/bh-module%" }}
            grade: {_lt: "1"}
        }
    ) {
        aggregate {
            count
        }
    }
}`;

export const querySendAuditPass = `query Result {
    user {
        audits_aggregate(where: {grade: {_gte:"1"}}) {
            aggregate{
                count
            }
        }
    }
}`;

export const querySendAuditFail = `query Result {
    user {
        audits_aggregate(where: {grade: {_lt:"1"}}) {
            aggregate{
                count
            }
        }
    }
}`;

export const querySkills = `query Transaction {
    transaction(
        where: { type: { _like: "skill%" } }
        order_by: { progress: { updatedAt: desc } }
    ) {
        amount
        originEventId
        path
        type
    }
}`;

export const basicInfo = `{
    user {
        login
        attrs
        campus
    }
}`;