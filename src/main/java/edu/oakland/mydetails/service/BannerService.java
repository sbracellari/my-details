package edu.oakland.mydetails.service;

import edu.oakland.mydetails.dao.BannerDao;
import edu.oakland.mydetails.model.Adviser;
import edu.oakland.mydetails.model.Student;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

@Service
public class BannerService {

  @Autowired private BannerDao dao;
  @Autowired private BadWordsService badWords;

  protected final Logger logger = LoggerFactory.getLogger("mydetails");

  // This regex is designed to only allow letters, periods, spaces, apostrophes, and dashes.
  // [A-Za-z]+ forces the string to begin with a letter, also forcing the string to be at least one
  // character in length.
  // The string can end in any amount of the allowed characters mentioned above.
  private static final Pattern pattern = Pattern.compile("[A-Za-z]+((\\s|\'|-|[.])[A-Za-z]*)*");

  public boolean checkPreferredName(String prefName) {
    if (prefName == null || prefName.length() > 60) {
      return false;
    }

    prefName = prefName.trim();
    Matcher m = pattern.matcher(prefName);

    return m.matches() && !badWords.isOnList(prefName);
  }

  public boolean updatePreferredName(String pidm, String prefName) {
    if (!checkPreferredName(prefName)) {
      return false;
    }

    String code = dao.updatePreferredName(pidm, prefName);

    if (!code.equals("0")) {
      logger.error(
          String.format(
              "Problem writing pref first name for pidm %s with name %s. Error code %s",
              pidm, prefName, code));
      return false;
    }
    return true;
  }

  @Cacheable(value = "student", key = "{ #root.methodName, #pidm }")
  public Student getStudentInfo(String pidm) {
    Student student = new Student();
    student.setCurriculums(dao.getCurriculums(pidm));
    student.setAdviser(getAdviserInfo(pidm));
    return student;
  }

  private Adviser getAdviserInfo(String pidm) {
    String mostRecentTerm = dao.getMostRecentTerm(pidm);

    try {
      return dao.getAdviserInfo(pidm, mostRecentTerm);
    } catch (EmptyResultDataAccessException e) {
      return new Adviser();
    }
  }
}
