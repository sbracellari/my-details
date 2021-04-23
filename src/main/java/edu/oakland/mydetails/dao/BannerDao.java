package edu.oakland.mydetails.dao;

import edu.oakland.mydetails.model.Adviser;
import edu.oakland.mydetails.model.Curriculum;

import java.sql.Types;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

@Repository
public class BannerDao {

  @Autowired private JdbcTemplate jdbcTemplate;

  public String getPreferredName(String pidm) throws DataAccessException {
    return jdbcTemplate.queryForObject(
        Constants.GET_PREF_FIRST_NAME, new Object[] {pidm}, String.class);
  }

  public List<Curriculum> getCurriculums(String pidm) throws DataAccessException {
    return jdbcTemplate.query(
        Constants.GET_DEGREES,
        new Object[] {pidm, pidm, pidm, pidm, pidm, pidm},
        Curriculum.mapper);
  }

  public String getMostRecentTerm(String pidm) throws DataAccessException {
    return jdbcTemplate.queryForObject(
        Constants.GET_MOST_RECENT_TERM, new Object[] {pidm}, String.class);
  }

  public Adviser getAdviserInfo(String pidm, String termCode) throws DataAccessException {
    return jdbcTemplate.queryForObject(
        Constants.GET_ADVISER_STRING, new Object[] {termCode, pidm}, Adviser.mapper);
  }

  public String updatePreferredName(String pidm, String prefName) {
    SimpleJdbcCall simpleJdbcCall =
        new SimpleJdbcCall(jdbcTemplate).withoutProcedureColumnMetaDataAccess();

    simpleJdbcCall.withProcedureName("");
    simpleJdbcCall.addDeclaredParameter(new SqlParameter("PIDM", Types.NUMERIC));
    simpleJdbcCall.addDeclaredParameter(new SqlParameter("PREF_FIRST_NAME", Types.VARCHAR));

    simpleJdbcCall.addDeclaredParameter(new SqlOutParameter("RETURN_CODE", Types.VARCHAR));

    SqlParameterSource params =
        new MapSqlParameterSource().addValue("PIDM", pidm).addValue("PREF_FIRST_NAME", prefName);

    Map<String, Object> results = simpleJdbcCall.execute(params);
    return results.get("RETURN_CODE").toString();
  }
}
