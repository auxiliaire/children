package com.personr.children.service;

import org.hibernate.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

@Service
@Transactional
public class ParentSummaryService {

    private final Logger log = LoggerFactory.getLogger(ParentSummaryService.class);

    @PersistenceContext
    EntityManager entityManager;

    public int regenerateParentSummary() {
        Session session = getCurrentSession();
        Query query = session.createNativeQuery(
            "TRUNCATE TABLE PARENT_SUMMARY");
        query.executeUpdate();
        query = session.createNativeQuery("INSERT INTO PARENT_SUMMARY (AMOUNT_OF_PERSONS, AMOUNT_OF_CHILDREN)" +
            " SELECT COUNT(ID) AS AMOUNT_OF_PERSONS, AMOUNT_OF_CHILDREN FROM" +
            "  (SELECT PERSON.ID, COUNT(CHILD.ID) AS AMOUNT_OF_CHILDREN FROM PERSON" +
            "   LEFT JOIN CHILD ON (CHILD.PERSON_ID = PERSON.ID) GROUP BY PERSON.ID)" +
            "GROUP BY AMOUNT_OF_CHILDREN ORDER BY AMOUNT_OF_CHILDREN"
        );
        return query.executeUpdate();
    }

    protected Session getCurrentSession()  {
        return entityManager.unwrap(Session.class);
    }
}
