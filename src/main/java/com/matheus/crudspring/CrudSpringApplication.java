package com.matheus.crudspring;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.matheus.crudspring.enums.Category;
import com.matheus.crudspring.model.Course;
import com.matheus.crudspring.model.Lesson;
import com.matheus.crudspring.repository.CourseRepository;

@SpringBootApplication
public class CrudSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrudSpringApplication.class, args);
	}

	@Bean
    CommandLineRunner initDataBase(CourseRepository courseRepository) {
        return args -> {
			courseRepository.deleteAll();

			for(int i = 0; i < 20; i++) {

				Course c = new Course();
				c.setName("Angular com Spring " + i);
				c.setCategory(Category.BACK_END);

				Lesson l = new Lesson();
				l.setName("Introdução");
				l.setYoutubeUrl("01324567890");
				l.setCourse(c);
				c.getLessons().add(l);

				Lesson l1 = new Lesson();
				l1.setName("Angular");
				l1.setYoutubeUrl("01324567891");
				l1.setCourse(c);
				c.getLessons().add(l1);
				

				courseRepository.save(c);
			}
        };
    }
}
