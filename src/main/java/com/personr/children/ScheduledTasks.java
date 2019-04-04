package com.personr.children;

import com.personr.children.service.ParentSummaryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduledTasks {

    private static final Logger log = LoggerFactory.getLogger(ScheduledTasks.class);

    private final ParentSummaryService parentSummaryService;

    public ScheduledTasks(ParentSummaryService parentSummaryService) {
        this.parentSummaryService = parentSummaryService;
    }

    @Scheduled(fixedRate = 900_000)
    public void calculateParentSummary() {
        log.info("Calculate Parent Summary task started");
        int num = parentSummaryService.regenerateParentSummary();
        log.info("Calculate Parent Summary task finished updating {} rows", num);
    }

}
