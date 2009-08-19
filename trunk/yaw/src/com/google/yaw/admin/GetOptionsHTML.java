package com.google.yaw.admin;

import com.google.yaw.Util;
import com.google.yaw.YouTubeApiManager;
import com.google.yaw.model.Assignment;

import java.io.IOException;
import java.util.logging.Logger;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class GetOptionsHTML extends HttpServlet {
    private static final Logger log = Logger.getLogger(GetAllAssignments.class
            .getName());

    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try {
            String type = req.getParameter("type");
            if (Util.isNullOrEmpty(type)) {
                throw new IllegalArgumentException("'type' parameter is null or empty.");
            }
            
            StringBuffer selectHTML = new StringBuffer("<select>");
            
            if (type.equals("category")) {
                for (String category : YouTubeApiManager.getCategoryCodes()) {
                    selectHTML.append(String.format("<option value='%s'>%s</option>",
                                    category, category));
                }
            } else if (type.equals("status")) {
                for (String status : Assignment.getAssignmentStatusNames()) {
                    selectHTML.append(String.format("<option value='%s'>%s</option>",
                                    status, status));
                }
            } else {
                throw new IllegalArgumentException(String.format("'%s' is not a valid value for" +
                		" parameter 'type'.", type));
            }
            
            selectHTML.append("</select>");

            resp.setContentType("text/plain");
            resp.getWriter().println(selectHTML.toString());
        } catch (IllegalArgumentException e) {
            log.warning(e.toString());
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, e.getMessage());
        }
    }
}