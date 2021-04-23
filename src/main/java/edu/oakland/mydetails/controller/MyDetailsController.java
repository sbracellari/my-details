package edu.oakland.mydetails.controller;

import edu.oakland.mydetails.dao.BannerDao;
import edu.oakland.mydetails.model.Person;
import edu.oakland.mydetails.model.Student;
import edu.oakland.mydetails.service.BannerService;
import edu.oakland.soffit.auth.AuthService;
import edu.oakland.soffit.auth.SoffitAuthException;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;

import com.auth0.jwt.interfaces.Claim;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1")
public class MyDetailsController {

  protected final Logger log = LoggerFactory.getLogger("mydetails");

  @Autowired private BannerDao dao;
  @Autowired private BannerService service;
  @Autowired private AuthService authorizer;

  @ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Illegal Arguments given")
  @ExceptionHandler({IllegalArgumentException.class, DataAccessException.class})
  public void illegalArgumentError(Exception e) {
    log.error("Throwing Illegal Argument or Data Access error");
    log.error("", e);
  }

  @ResponseStatus(value = HttpStatus.UNAUTHORIZED, reason = "Invalid JWT")
  @ExceptionHandler(SoffitAuthException.class)
  public void soffitError(SoffitAuthException e) {
    log.error("Invalid JWT");
    log.error("", e);
  }

  @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR, reason = "Unspecified exception")
  @ExceptionHandler(Exception.class)
  public void generalError(Exception e) {
    log.error("Unspecified exception");
    log.error("", e);
  }

  @GetMapping("status-check")
  public boolean statusCheck() {
    return true;
  }

  @GetMapping("student")
  @ResponseStatus(HttpStatus.OK)
  public Student studentInfo(HttpServletRequest request) throws SoffitAuthException {
    String pidm = authorizer.getClaimFromJWE(request, "pidm").asString();
    return service.getStudentInfo(pidm);
  }

  @GetMapping("person")
  @ResponseStatus(HttpStatus.OK)
  public Person personInfo(HttpServletRequest request) throws SoffitAuthException {
    Person person = personFromJwt(request);

    return person;
  }

  @GetMapping("details")
  @ResponseStatus(HttpStatus.OK)
  public Map<String, Object> getAllDetails(HttpServletRequest request) throws SoffitAuthException {
    Map<String, Object> details = new HashMap<>();
    Person person = personFromJwt(request);
    String pidm = authorizer.getClaimFromJWE(request, "pidm").asString();

    details.put("person", person);
    details.put("student", service.getStudentInfo(pidm));

    return details;
  }

  @PostMapping("preferred-name/{prefName}")
  @ResponseStatus(HttpStatus.OK)
  public boolean updatePreferredName(
      @PathVariable("prefName") String prefName, HttpServletRequest request)
      throws SoffitAuthException {
    String pidm = authorizer.getClaimFromJWE(request, "pidm").asString();

    return (service.updatePreferredName(pidm, prefName));
  }

  private Person personFromJwt(HttpServletRequest request) throws SoffitAuthException {
    Map<String, Claim> personInfo = authorizer.getClaimsFromJWE(request);
    Person person = new Person();
    String pidm = personInfo.get("pidm").asString();
    String givenName = personInfo.get("givenName").asString();
    String prefName = dao.getPreferredName(pidm);

    person.setPrefName((prefName == null || prefName.length() == 0) ? givenName : prefName);
    person.setLegalName(personInfo.get("cn") == null ? null : personInfo.get("cn").asString());
    person.setGid(personInfo.get("gid") == null ? null : personInfo.get("gid").asString());
    person.setEmail(personInfo.get("mail") == null ? null : personInfo.get("mail").asString());
    person.setAddress(
        personInfo.get("postalAddress") == null
            ? null
            : personInfo.get("postalAddress").asString());
    person.setPhone(
        personInfo.get("telephoneNumber") == null
            ? null
            : personInfo.get("telephoneNumber").asString());

    return person;
  }
}
