package org.example.mongodbdemo.repository;

import org.example.mongodbdemo.model.Book;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookRepository extends MongoRepository<Book, String> {
}
