package net.circle.business.core;

public interface IReadSaveDelete<T> extends IReadSave<T> {

	void delete(Integer id) throws Exception;

}
