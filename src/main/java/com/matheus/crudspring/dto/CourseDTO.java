package com.matheus.crudspring.dto;

import java.util.List;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.matheus.crudspring.enums.Category;
import com.matheus.crudspring.enums.validation.ValueOfEnum;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record CourseDTO(
    @JsonProperty("_id") Long id,     
    @NotNull @NotBlank @Length(min = 5, max = 100) String name, 
    @NotNull @Length(max = 10) @ValueOfEnum(enumClass = Category.class) String category,
    @NotNull @NotEmpty @Valid List<LessonDTO> lessons) {
    
}
