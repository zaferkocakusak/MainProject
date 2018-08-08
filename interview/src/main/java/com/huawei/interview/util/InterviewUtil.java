package com.huawei.interview.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.huawei.interview.model.ToDoItem;

public class InterviewUtil {
	
	public static Long CheckExpiredOrCompleted(ToDoItem toDoItem) {
		
		DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
		Date deadline =null;
		Date today = new Date();
		try {
			deadline= df.parse(toDoItem.getDeadline());
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

        if (today.compareTo(deadline) > 0) {
            return new Long(3);
        } else if (today.compareTo(deadline) < 0) {
        	return new Long(2);
        }else {
        	return new Long(1);
        }
		

		
	}

}
