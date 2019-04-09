<?php

class FormData {
	private $entries;

	public function __construct() {
		$this->entries = array_merge([], $_POST, $this->getFilteredFiles());
	}

	public function getEntries() {
		return $this->entries;
	}

	public function hasError() {
		return isset($this->entries['error']) && (bool)$this->entries['error'];
	}

	public function apply($key, $callable) {
		if ($this->hasError() || !(
			isset($this->entries[$key])
			&& $this->entries[$key]
		)) {
			return $this;
		}

		try {
			$error = $callable($this->entries);

			if (is_wp_error($error)) {
				throw new Exception($error->get_error_message());
			}
		} catch (Exception $error) {
			$this->entries['error'] = $error;
		}

		return $this;
	}

	public function catch($callable) {
		if ($this->hasError()) {
			$callable($this->entries['error']);
		}
	}

	private function getFilteredFiles() {
		return array_filter($_FILES, function($file) {
			$tmp_name = $file['tmp_name'];
			return file_exists($tmp_name) && is_uploaded_file($tmp_name);
		});
	}
}
