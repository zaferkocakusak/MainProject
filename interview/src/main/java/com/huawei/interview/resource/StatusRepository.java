package com.huawei.interview.resource;

import org.springframework.data.jpa.repository.JpaRepository;

import com.huawei.interview.model.Status;


public interface StatusRepository  extends JpaRepository<Status, Long> {

}
