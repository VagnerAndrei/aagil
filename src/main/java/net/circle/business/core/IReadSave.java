package net.circle.business.core;

public interface IReadSave<T> extends IRead<T> {

	T salvar(T model) throws Exception;

}
