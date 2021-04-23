package edu.oakland.mydetails.model;

import java.util.List;

import lombok.Data;

@Data
public class Student {
  private List<Curriculum> curriculums;
  private Adviser adviser;
}
