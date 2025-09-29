package com.enjoytrip.common.listener;

import com.enjoytrip.member.model.dao.FileMemberDao;
import com.enjoytrip.plan.model.dao.FilePlanDao;
import com.enjoytrip.scrap.model.dao.FileScrapDao;

import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;
import jakarta.servlet.annotation.WebListener;

@WebListener
public class MyContextListener implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        String dataPath = sce.getServletContext().getRealPath("/WEB-INF/data");
        FileMemberDao.getInstance().init(dataPath);
        FilePlanDao.getInstance().init(dataPath);
        FileScrapDao.getInstance().init(dataPath);
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        FileMemberDao.getInstance().save();
        FilePlanDao.getInstance().save();
        FileScrapDao.getInstance().save();
    }
}
