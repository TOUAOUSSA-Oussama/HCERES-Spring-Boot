package org.centrale.hceres.service;

import org.centrale.hceres.items.*;
import org.centrale.hceres.repository.*;
import org.centrale.hceres.util.RequestParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.math.BigDecimal;
import java.util.*;

@Service
public class ReviewService {
    @Autowired
    private ReviewingJournalArticlesRepository reviewingJournalArticlesRepository;
    @Autowired
    private ResearchRepository researchRepo;
    @Autowired
    private ActivityRepository activityRepo;
    @Autowired
    private TypeActivityRepository typeActivityLevelRepo;
    @Autowired
    private JournalRepository journalRepository;


    public Iterable<ReviewingJournalArticles> getReviews(){
        return reviewingJournalArticlesRepository.findAll();
    }


    public Optional<ReviewingJournalArticles> getReview(final Integer id) {
        return reviewingJournalArticlesRepository.findById(id);
    }


    public void deleteReviewById(final Integer id) {
        reviewingJournalArticlesRepository.deleteById(id);
    }

    public ReviewingJournalArticles saveReview(@RequestBody Map<String, Object> request) {

        ReviewingJournalArticles reviewToSave = new ReviewingJournalArticles();

        // Year
        Integer year = Integer.parseInt((String)request.get("year"));
        reviewToSave.setYear(year);

        // nb_reviewed_articles
        Integer nbReviewedArticles = Integer.parseInt((String)request.get("nbReviewedArticles"));
        reviewToSave.setNbReviewedArticles(nbReviewedArticles);

        // impact_factor

        BigDecimal impactFactor = new BigDecimal((String)request.get("impactFactor"));
        reviewToSave.setImpactFactor(impactFactor);

        // Activity :
        Activity activity = new Activity();
        TypeActivity typeActivity = typeActivityLevelRepo.getById(23);
        activity.setIdTypeActivity(typeActivity);

        // Add this activity to the researcher activity list :
        Integer researcherId = RequestParser.parseInt(request.get("researcherId"));
        Optional<Researcher> researcherOp = researchRepo.findById(researcherId);
        Researcher researcher = researcherOp.get();
        List<Activity> activityList = researcher.getActivityList();
        activityList.add(activity);
        researcher.setActivityList(activityList);

        // Add this activity to the reasearcher :
        List<Researcher> activityResearch = activity.getResearcherList();
        if (activityResearch == null) {
            activityResearch = new ArrayList<Researcher>();
        }
        activityResearch.add(researcher);
        activity.setResearcherList(activityResearch);

        Activity savedActivity = activityRepo.save(activity);
        reviewToSave.setActivity(savedActivity);

        // Created Editorial id :
        Integer idReview = activity.getIdActivity();
        reviewToSave.setIdActivity(idReview);

        // Creating journal object with given name in form (must include in future the possibility to select among the existing journals)
        String journalName = (String)request.get("journalName") ;

        if (journalRepository.findByName(journalName)==null){
            Journal journal = new Journal();
            journal.setJournalName(journalName);
            reviewToSave.setJournalId(journal);
        }
        else {
            Journal journal = journalRepository.findByName(journalName);
            reviewToSave.setJournalId(journal);
        }

        // Persist Platform to database :
        ReviewingJournalArticles saveReview = reviewingJournalArticlesRepository.save(reviewToSave);
        return saveReview;
    }
}
