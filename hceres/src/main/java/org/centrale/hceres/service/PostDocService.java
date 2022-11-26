package org.centrale.hceres.service;

import org.centrale.hceres.items.*;
import org.centrale.hceres.repository.*;
import org.centrale.hceres.repository.PostDocRepository;

import org.centrale.hceres.util.RequestParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class PostDocService {

    /**
     * Instanciation
     */
    @Autowired
    private ResearchRepository researchRepo;
    @Autowired
    private PostDocRepository postDocRepository;
    @Autowired
    private ActivityRepository activityRepo;
    @Autowired
    private TypeActivityRepository typeActivityLevelRepo;

    public Iterable<PostDoc> getPostDocs(){
        return postDocRepository.findAll();
    }


    public Optional<PostDoc> getPostDoc(final Integer id) {
        return postDocRepository.findById(id);
    }

    public void deletePostDoc(final Integer id) {
        postDocRepository.deleteById(id);
    }


    public PostDoc savePostDoc(@RequestBody Map<String, Object> request) {
        PostDoc postDocToSave = new PostDoc();

        // PostDocName :
        postDocToSave.setNamePostDoc((String)request.get("postDocName"));

        // Supervisor Name
        postDocToSave.setNameSupervisor((String)request.get("supervisorName"));

        // Arrival Date :
        String arrivalDate = (String)request.get("arrivalDate");
        postDocToSave.setArrivalDate(getDateFromString(arrivalDate, "yyyy-MM-dd"));

        // Departure Date :
        String departureDate = (String)request.get("departureDate");
        postDocToSave.setDepartureDate(getDateFromString(departureDate, "yyyy-MM-dd"));

        // Duration:
        postDocToSave.setDuration(Integer.parseInt((String)request.get("duration")));

        // Nationality:
        postDocToSave.setNationality((String)request.get("nationality"));

        // Original Lab:
        postDocToSave.setOriginalLab((String)request.get("originalLab"));

        // Associated Funding:
        postDocToSave.setAssociatedFunding((String)request.get("associatedFunding"));

        // Associated Publication Ref:
        postDocToSave.setAssociatedPubliRef((String)request.get("associatedPubliRef"));

        // Activity :
        Activity activity = new Activity();
        TypeActivity typeActivity = typeActivityLevelRepo.getById(21);
        activity.setIdTypeActivity(typeActivity);

        // Add activity to researchers list :
        Integer researcherId = RequestParser.parseInt(request.get("researcherId"));

        Optional<Researcher> researcherOp = researchRepo.findById(researcherId);
        Researcher researcher = researcherOp.get();

        List<Activity> activityList = researcher.getActivityList();
        activityList.add(activity);
        researcher.setActivityList(activityList);

        // Add Post Doc to Researcher activities :
        List<Researcher> activityResearch = activity.getResearcherList();
        if (activityResearch == null) {
            activityResearch = new ArrayList<Researcher>();
        }
        activityResearch.add(researcher);
        activity.setResearcherList(activityResearch);

        Activity savedActivity = activityRepo.save(activity);
        postDocToSave.setActivity(savedActivity);


        // Added PostDoc Id :
        Integer idPostDoc = activity.getIdActivity();
        postDocToSave.setIdActivity(idPostDoc);


        // Persist PostDoc object to the data base :
        PostDoc savePostDoc = postDocRepository.save(postDocToSave);

        return savePostDoc;
    }

    // Util function to convert string to date
    public Date getDateFromString(String aDate, String format) {
        Date returnedValue = null;
        try {
            // try to convert
            SimpleDateFormat aFormater = new SimpleDateFormat(format);
            returnedValue = aFormater.parse(aDate);
        } catch (ParseException ex) {
        }

        if (returnedValue != null) {
            Calendar aCalendar = Calendar.getInstance();
            aCalendar.setTime(returnedValue);
        }
        return returnedValue;
    }
}
